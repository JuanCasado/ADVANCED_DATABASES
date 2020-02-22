package org.uah.mmaa.config.mybatis.handler;

import java.sql.CallableStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.apache.ibatis.executor.result.ResultMapException;
import org.apache.ibatis.type.BaseTypeHandler;

/**
 * Almost the same type handler as {@link BaseTypeHandler}, but it does not reset your result value to null if DB column was null.
 * 
 * If you implements this handler you can return not null result for null column values in DB.
 */
public abstract class NotNullResultTypeHandler<T> extends BaseTypeHandler<T>
{
    @Override
    public T getResult(ResultSet rs, String columnName) throws SQLException
    {
        try
        {
            return getNullableResult(rs, columnName);
        }
        catch (Exception e)
        {
            throw new ResultMapException("Error attempting to get column '" + columnName + "' from result set.  Cause: " + e, e);
        }
    }

    @Override
    public T getResult(ResultSet rs, int columnIndex) throws SQLException
    {
        try
        {
            return getNullableResult(rs, columnIndex);
        }
        catch (Exception e)
        {
            throw new ResultMapException("Error attempting to get column #" + columnIndex + " from result set.  Cause: " + e, e);
        }
    }

    @Override
    public T getResult(CallableStatement cs, int columnIndex) throws SQLException
    {
        try
        {
            return getNullableResult(cs, columnIndex);
        }
        catch (Exception e)
        {
            throw new ResultMapException("Error attempting to get column #" + columnIndex + " from callable statement.  Cause: " + e, e);
        }
    }
}
